namespace TheOldDude.Domain
{
    public class Post
    {
        public Offer Offer { get; set; }
        public Article Article { get; set; }
        public decimal PricePerUnit { get; set; }
    }
}
