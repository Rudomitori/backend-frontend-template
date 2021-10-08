using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using MccSoft.WebApi.Patching.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using NJsonSchema;
using NJsonSchema.Generation;

namespace MccSoft.WebApi.Patching
{
    /// <summary>
    /// Schema processor that makes all value types (int, string, bool, etc.) required in OpenApi
    /// Classes that inherits from PatchRequest are omitted (since all properties in these classes are optional)
    /// </summary>
    public class RequireValueTypesSchemaProcessor : ISchemaProcessor
    {
        private static readonly Type _patchRequestType = typeof(IPatchRequest);

        public void Process(SchemaProcessorContext context)
        {
            var schema = context.Schema;
            if (
                _patchRequestType.IsAssignableFrom(context.Type)
                || context.Type == typeof(ValidationProblemDetails)
                || context.Type == typeof(ProblemDetails)
            ) {
                // Classes that inherits from PatchRequest are omitted (since all properties in these classes are optional)
                return;
            }

            if (context.Type.IsAssignableTo(typeof(JToken)))
            {
                // there's no need to do detailed parsing of JToken types
                return;
            }

            Dictionary<string, PropertyInfo> clrProperties;
            try
            {
                clrProperties = context.Type.GetProperties().ToDictionary(x => x.Name.ToLower());
            }
            catch (Exception e)
            {
                throw new InvalidOperationException(
                    $"Error getting properties from type {context.Type}",
                    e
                );
            }

            foreach (var propertyKeyValue in schema.ActualProperties)
            {
                var actualSchema = schema.ActualSchema;
                var property = propertyKeyValue.Value;
                string propertyName = property.Name;
                if (
                    property.Type == JsonObjectType.String
                    || property.Type == JsonObjectType.Boolean
                    || property.Type == JsonObjectType.Integer
                    || property.Type == JsonObjectType.Number
                    || property.Type == JsonObjectType.None /* enum */
                ) {
                    property.IsRequired = true;

                    if (!clrProperties.ContainsKey(propertyName.ToLower()))
                    {
                        // this could happen with 'discriminator' field
                        continue;
                    }

                    PropertyInfo clrProperty = clrProperties[propertyName.ToLower()];
                    bool canBeNull =
                        clrProperty?.GetCustomAttribute<NotRequiredAttribute>() != null;

                    if (canBeNull)
                    {
                        property.IsRequired = false;
                    }
                    else
                    {
                        property.IsRequired = true;

                        if (property.Type == JsonObjectType.String)
                        {
                            if (property.Format != "date-time")
                            {
                                property.IsNullableRaw = false;
                            }
                        }
                    }
                }
            }
        }
    }
}
