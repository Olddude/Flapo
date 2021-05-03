using TheOldDude.Domain;

using Microsoft.AspNetCore.Mvc.ModelBinding;

using System.Linq;
using System.Threading.Tasks;


namespace TheOldDude.WebApi.ModelBinder
{
    public class SortOptionsModelBinderProvider : IModelBinderProvider
    {
        public IModelBinder GetBinder(ModelBinderProviderContext context) =>
            (context != null && context.Metadata.ModelType == typeof(SortOptions))
                ? new SortOptionsModelBinder()
                : null;
    }

    public class SortOptionsModelBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            const string modelName = "sortBy";
            
            var valueProviderResult = bindingContext.ValueProvider.GetValue(modelName);
            if (valueProviderResult == ValueProviderResult.None)
            {
                return Task.CompletedTask;
            }

            bindingContext.ModelState.SetModelValue(bindingContext.ModelName, valueProviderResult);

            var sortExpressions = valueProviderResult.Values.ToString().Split(",");
            var parsedSort = SortOptions.FromArray(sortExpressions);

            if (parsedSort.GetKeyValuePairs().Count() != valueProviderResult.Length)
            {
                const string errorMessage = "Failed to convert all sort expressions in URI. Maybe a colon is missing.";
                bindingContext.ModelState.AddModelError(bindingContext.ModelName, errorMessage);

                if (parsedSort.HasEntries == false)
                {
                    bindingContext.Result = ModelBindingResult.Failed();
                    return Task.CompletedTask;
                }
                // Else: Result not ModelBindingResult.Failed() because some expressions could be parsed.
            }

            bindingContext.Model = parsedSort;
            bindingContext.Result = ModelBindingResult.Success(parsedSort);

            return Task.CompletedTask;
        }
    }
}
