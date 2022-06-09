﻿using MccSoft.TemplateApp.App.Settings;
using MccSoft.WebApi.Patching;
using NSwag;
using NSwag.AspNetCore;
using NSwag.Generation.Processors.Security;

namespace MccSoft.TemplateApp.App.Setup;

public static class SetupSwagger
{
    private static SwaggerOptions GetSwaggerOptions(this IConfiguration configuration)
    {
        return configuration.GetSection("Swagger").Get<SwaggerOptions>();
    }

    public static void AddSwagger(IServiceCollection services, IConfiguration configuration)
    {
        var swaggerOptions = configuration.GetSwaggerOptions();
        services.AddOpenApiDocument(options =>
        {
            options.DocumentProcessors.Add(
                new SecurityDefinitionAppender(
                    "JWT Token",
                    new OpenApiSecurityScheme
                    {
                        Type = OpenApiSecuritySchemeType.ApiKey,
                        Name = "Authorization",
                        Description = "Copy 'Bearer ' + valid JWT token into field",
                        In = OpenApiSecurityApiKeyLocation.Header
                    }
                )
            );

            options.PostProcess = document =>
            {
                document.Info = new OpenApiInfo
                {
                    Version = swaggerOptions.Version,
                    Title = swaggerOptions.Title,
                    Description = swaggerOptions.Description,
                    Contact = new OpenApiContact { Email = swaggerOptions.Contact.Email },
                    License = new OpenApiLicense { Name = swaggerOptions.License.Name },
                };
            };

            options.AddSecurity(
                "Bearer",
                new OpenApiSecurityScheme()
                {
                    Type = OpenApiSecuritySchemeType.OAuth2,
                    Description = "TemplateApp Authentication",
                    Flow = OpenApiOAuth2Flow.Password,
                    Flows = new OpenApiOAuthFlows()
                    {
                        Password = new OpenApiOAuthFlow()
                        {
                            TokenUrl = "/connect/token",
                            RefreshUrl = "/connect/token",
                            AuthorizationUrl = "/connect/token",
                            Scopes = new Dictionary<string, string>()
                            {
                                { "offline_access", "offline_access" },
                            }
                        }
                    }
                }
            );
            options.OperationProcessors.Add(
                new AspNetCoreOperationSecurityScopeProcessor("Bearer")
            );
            options.SchemaProcessors.Add(new RequireValueTypesSchemaProcessor());
            //options.FlattenInheritanceHierarchy = true;
            options.GenerateEnumMappingDescription = true;
        });
    }

    public static void UseSwagger(WebApplication app)
    {
        var swaggerOptions = app.Configuration.GetSwaggerOptions();
        if (!swaggerOptions.Enabled)
        {
            return;
        }

        app.UseOpenApi(options =>
        {
            options.Path = "/swagger/v1/swagger.json";
        });
        app.UseSwaggerUi3(options =>
        {
            options.Path = "/swagger";
            options.DocumentPath = "/swagger/v1/swagger.json";
            options.OAuth2Client = new OAuth2ClientSettings()
            {
                AppName = "swagger",
                Realm = "swagger",
            };
        });
    }
}