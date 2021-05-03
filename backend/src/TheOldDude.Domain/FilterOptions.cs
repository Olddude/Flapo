using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;

namespace TheOldDude.Domain
{
    public class FilterOptions
    {
        public FilterOptions()
        {
            this.Predicates = new NameValueCollection();
        }

        public NameValueCollection Predicates { get; }

        public bool HasPredicates => this.Predicates.Count != 0;

        public IEnumerable<KeyValuePair<string, string>> GetKeyValuePairs() =>
            this.Predicates.AllKeys
                .SelectMany(key => this.Predicates.GetValues(key)
                    .Select(value => new KeyValuePair<string, string>(key, value)));

        public static FilterOptions FromArray(string[] filterExpressions)
        {
            var resultFilter = new FilterOptions();

            if (filterExpressions != null)
            {
                foreach (var expr in filterExpressions)
                {
                    var splitted = expr.Split(':');
                    if (splitted.Length == 2)
                    {
                        resultFilter.Predicates.Add(splitted[0], splitted[1]);
                    }
                }
            }

            return resultFilter;
        }
    }
}
