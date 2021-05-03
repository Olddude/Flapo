using TheOldDude.Domain;
using TheOldDude.Services.Abstractions;
using TheOldDude.WebApi.Controllers.Post;

using Moq;
using FluentAssertions;
using Xunit;

using System.Threading.Tasks;

namespace TheOldDude.WebApi.Tests
{
    public class WhenPostControllerResponseOk
    {
        [Fact]
        public async Task ThenPostsAreReturned()
        {
            var mockRequest = new PostRequest();

            var provider = new Mock<IPostProvider>();
            provider.Setup(_ => _.GetAsync(It.IsAny<PostRequest>()))
                .ReturnsAsync(new Post[]
                {
                    new Post
                    {
                        Offer = new Offer(),
                        Article = new Article(),
                        PricePerUnit = 20.00m
                    }
                });

            var sut = new PostController(provider.Object);

            var result = await sut.Get(mockRequest);

            result.Length.Should().Be(1);
        }
    }
}
