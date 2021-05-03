namespace TheOldDude.Domain
{
    public class Offer
    {
        public int Id { get; set; }
        public string BrandName { get; set; }
        public string Name { get; set; }
        public string DescriptionText { get; set; }
        public Article[] Articles { get; set; }
    }
}
