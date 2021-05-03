using Microsoft.AspNetCore.Mvc;

namespace TheOldDude.WebApi.Controllers.Post
{
    public class PostRouteAttribute : RouteAttribute
    {
        const string route = "posts";
        public PostRouteAttribute() : base(route) { }
    }
}
