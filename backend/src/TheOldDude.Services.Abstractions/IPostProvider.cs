using TheOldDude.Domain;

using System.Threading.Tasks;

namespace TheOldDude.Services.Abstractions
{
    public interface IPostProvider
    {
        Task<Post[]> GetAsync(PostRequest request);
    }
}
