using TheOldDude.Domain;
using TheOldDude.Domain.Extensions;
using TheOldDude.DataAccess.Abstractions;
using TheOldDude.Services.Abstractions;

using System.Threading.Tasks;
using System.Linq;

namespace TheOldDude.Services
{
    public class PostProvider : IPostProvider
    {
        private readonly IOfferReader offerReader;

        public PostProvider(IOfferReader offerReader)
        {
            this.offerReader = offerReader;
        }

        public async Task<Post[]> GetAsync(PostRequest postRequest)
        {
            var offers = await this.offerReader.ReadAsync();
            var posts = offers.SelectMany(offer => offer.AsPosts());
            var filteredPosts = posts.FilterBy(postRequest.FilterOptions);
            var filteredSortedPosts = filteredPosts.SortBy(postRequest.SortOptions);
            var queriesPosts = filteredSortedPosts.ToArray();
            return queriesPosts;
        }
            
    }
}
