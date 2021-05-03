using TheOldDude.Domain;

using Moq;
using FluentAssertions;
using Xunit;

using Microsoft.Extensions.Options;

using System.Net.Http;
using System.Threading.Tasks;
using System.Threading;
using System.Net;
using System.IO;
using System.Text;
using System.Text.Json;

namespace TheOldDude.DataAccess.Tests
{
    public class WhenReadOffersAsyncIsSuccess
    {
        [Fact]
        public async Task ThenOffersAreReturned()
        {
            var options = new Mock<IOptions<HttpOfferReaderOptions>>();
            options.Setup(_ => _.Value).Returns(new HttpOfferReaderOptions
            {
                Url = "https://localhost/foobar"
            });

            var httpClientFactory = new Mock<IHttpClientFactory>();
            var httpMessageHandler = new MockHttpMessageHandler();
            var httpClient = new HttpClient(httpMessageHandler);

            httpClientFactory.Setup(_ => _.CreateClient(It.IsAny<string>()))
                .Returns(httpClient);

            var sut = new HttpOfferReader
            (
                httpClientFactory.Object,
                options.Object
            );

            var results = await sut.ReadAsync();

            results.Should().BeEquivalentTo(MockOffers.Get());
        }
    }

    internal class MockHttpMessageHandler : HttpMessageHandler
    {
        protected override Task<HttpResponseMessage> SendAsync
        (
            HttpRequestMessage request,
            CancellationToken cancellationToken
        )
        {
            var responseBody = MockOffers.Get();
            var responseBodyText = JsonSerializer.Serialize(responseBody);
            var responseBodyBytes = Encoding.UTF8.GetBytes(responseBodyText);
            var responseBodyStream = new MemoryStream(responseBodyBytes);
            var response = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StreamContent(responseBodyStream)
            };
            return Task.FromResult(response);
        }
    }

    internal static class MockOffers
    {
        internal static Offer[] Get()
        {
            return new Offer[]
            {
                new Offer
                {
                    Id = 123,
                    Name = "Name",
                    BrandName = "BrandName",
                    DescriptionText = "DescriptionText",
                    Articles = new Article[]
                    {
                        new Article
                        {
                            Id = 124,
                            Image = "Image",
                            Price = 19.99m,
                            PricePerUnitText = "(2,00€ / Liter)",
                            Unit = "Liter",
                            ShortDescription = "20 x 0,5L (Glas)"
                        }
                    }
                }
            };
        }
    }
}
