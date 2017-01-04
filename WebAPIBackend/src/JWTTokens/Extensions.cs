using JWTTokens;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPIBackend
{
    public static class Extensions
    {
        public static void UseJWT(this IApplicationBuilder app, string secretkey, string validateissuer, string validaudiance, TimeSpan timeout , Func<string, string, bool> identify, string route)
        {

            //Get a JWT Token
            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretkey));

            var options = new TokenProviderOptions
            {
                Audience = validaudiance,
                Issuer = validateissuer,
                SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256),
                Expiration = timeout,
                Path = route
            };

            app.UseMiddleware<TokenProviderMiddleware>(Options.Create(options), identify);



            //Enable authentication with JWT-tokens
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,
                ValidateIssuer = true,
                ValidIssuer = validateissuer,
                ValidateAudience = true,
                ValidAudience = validaudiance,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                TokenValidationParameters = tokenValidationParameters
            });
        }
    }
}
