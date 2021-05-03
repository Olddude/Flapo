using TheOldDude.Domain;
using TheOldDude.DataAccess.Abstractions;

using FluentAssertions;
using Moq;
using Xunit;

using System.Threading.Tasks;

namespace TheOldDude.Services.Tests
{
    public class WhenGettingPostsAsyncIsSuccess
    {
        [Fact]
        public async Task ThenPostsAreReturned()
        {
            var reader = new Mock<IOfferReader>();
            reader.Setup(_ => _.ReadAsync()).ReturnsAsync(MockOffers.Get());
            var sut = new PostProvider(reader.Object);
            var posts = await sut.GetAsync(new PostRequest());
            reader.Verify(_ => _.ReadAsync(), Times.Once);
            posts.Length.Should().Be(2);
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
                    Articles = new Article[]
                    {
                        new Article
                        {
                            Price = 19.99m,
                            ShortDescription = "20 x 0,5L (Glas)"
                        },
                        new Article
                        {
                            Price = 9.99m,
                            ShortDescription = "8 x 0,33L (Glas)"
                        }
                    }
                }
            };
        }
    }
}
