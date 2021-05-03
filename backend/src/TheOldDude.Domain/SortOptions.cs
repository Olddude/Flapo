using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;

namespace TheOldDude.Domain
{
    public class SortOptions
    {
        public SortOptions()
        {
            this.Entries = new NameValueCollection();
        }

        public NameValueCollection Entries { get; }

        public bool HasEntries => this.Entries.Count != 0;

        public IEnumerable<KeyValuePair<string, string>> GetKeyValuePairs() => 
            this.Entries.AllKeys
                .SelectMany(key => this.Entries.GetValues(key)
                    .Select(value => new KeyValuePair<string, string>(key, value)));

        public static SortOptions FromArray(string[] sorterExpressions)
        {
            var result = new SortOptions();

            if (sorterExpressions != null)
            {
                foreach (var expr in sorterExpressions)
                {
                    var splitted = expr.Split(':');
                    if (splitted.Length == 2)
                    {
                        result.Entries.Add(splitted[0], splitted[1]);
                    }
                }
            }

            return result;
        }
    }
}
