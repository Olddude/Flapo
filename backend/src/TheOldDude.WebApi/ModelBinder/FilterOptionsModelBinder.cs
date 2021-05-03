using TheOldDude.Domain;

using Microsoft.AspNetCore.Mvc.ModelBinding;

using System.Linq;
using System.Threading.Tasks;

namespace TheOldDude.WebApi.ModelBinder
{
    public class FilterOptionsModelBinderProvider : IModelBinderProvider
    {
        public IModelBinder GetBinder(ModelBinderProviderContext context) =>
            (context != null && context.Metadata.ModelType == typeof(FilterOptions))
                ? new FilterOptionsModelBinder()
                : null;
    }

    public class FilterOptionsModelBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            const string modelName = "filterBy";
            var valueProviderResult = bindingContext.ValueProvider.GetValue(modelName);
            if (valueProviderResult == ValueProviderResult.None)
            {
                return Task.CompletedTask;
            }

            bindingContext.ModelState.SetModelValue(bindingContext.ModelName, valueProviderResult);

            var filterExpressions = valueProviderResult.Values.ToString().Split(",");
            var parsedFilter = FilterOptions.FromArray(filterExpressions);

            if (parsedFilter.GetKeyValuePairs().Count() != valueProviderResult.Length)
            {
                const string errorMessage = "Failed to convert all filter expressions in URI. Maybe a colon is missing.";
                bindingContext.ModelState.AddModelError(bindingContext.ModelName, errorMessage);

                if (parsedFilter.HasPredicates == false)
                {
                    bindingContext.Result = ModelBindingResult.Failed();
                    return Task.CompletedTask;
                }
                // Else: Result not ModelBindingResult.Failed() because some expressions could be parsed.
            }

            bindingContext.Model = parsedFilter;
            bindingContext.Result = ModelBindingResult.Success(parsedFilter);

            return Task.CompletedTask;
        }
    }
}
