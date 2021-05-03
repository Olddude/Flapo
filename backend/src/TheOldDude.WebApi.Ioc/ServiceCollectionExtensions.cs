using TheOldDude.DataAccess.Abstractions;
using TheOldDude.DataAccess;
using TheOldDude.Services.Abstractions;
using TheOldDude.Services;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TheOldDude.WebApi.Ioc
{
    public static class ServiceCollectionExtensions
    {
        public static void RegisterServices
        (
            this IServiceCollection services,
            IConfiguration configuration
        )
        {
            services.Configure<HttpOfferReaderOptions>(options =>
                configuration.GetSection("HttpOfferReader").Bind(options));

            services.AddTransient<IOfferReader, HttpOfferReader>();

            services.AddTransient<IPostProvider, PostProvider>();
        }
    }
}
