using TheOldDude.Domain;
using TheOldDude.Domain.Extensions;
using TheOldDude.Services.Abstractions;

using Microsoft.AspNetCore.Mvc;

using System.Linq;
using System.Threading.Tasks;

namespace TheOldDude.WebApi.Controllers.Post
{
    [PostRoute]
    public class PostController : ControllerBase
    {
        private readonly IPostProvider postProvider;

        public PostController(IPostProvider postProvider)
        {
            this.postProvider = postProvider;
        }

        [HttpGet]
        public async Task<PostResponse[]> Get([FromQuery] PostRequest request)
        {
            var posts = await this.postProvider.GetAsync(request);
            var responses = posts.Select(_ => _.AsResponse()).ToArray();
            return responses;
        }
    }
}
