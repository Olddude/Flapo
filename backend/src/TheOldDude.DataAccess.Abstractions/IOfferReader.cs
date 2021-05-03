using TheOldDude.Domain;

using System.Threading.Tasks;

namespace TheOldDude.DataAccess.Abstractions
{
    public interface IOfferReader
    {
        Task<Offer[]> ReadAsync();
    }
}
