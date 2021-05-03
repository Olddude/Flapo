using TheOldDude.Domain;
using TheOldDude.DataAccess.Abstractions;

using Microsoft.Extensions.Options;

using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace TheOldDude.DataAccess
{
    public class HttpOfferReaderOptions
    {
        public string Url { get; set; }
    }

    public class HttpOfferReader : IOfferReader
    {
        private readonly IHttpClientFactory httpClientFactory;
        private readonly IOptions<HttpOfferReaderOptions> options;

        public HttpOfferReader
        (
            IHttpClientFactory httpClientFactory,
            IOptions<HttpOfferReaderOptions> options
        )
        {
            this.httpClientFactory = httpClientFactory;
            this.options = options;
        }

        public async Task<Offer[]> ReadAsync()
        {
            var httpClient = this.httpClientFactory.CreateClient();
            var result = await httpClient.GetStreamAsync(this.options.Value.Url);
            var jsonSerializerOptions = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            var offers = await JsonSerializer.DeserializeAsync<Offer[]>
            (
                result,
                jsonSerializerOptions
            );
            return offers;
        }
    }
}
