using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Funtest.Security
{
    public class ApiRequireHttpsAttribute: RequireHttpsAttribute
    {

        /// <summary>
        /// Called if the request is not received over HTTPS.
        /// </summary>
        /// <param name="filterContext">The filter context</param>
        protected override void HandleNonHttpsRequest(AuthorizationFilterContext filterContext)
        {
            filterContext.Result = new StatusCodeResult(400);
        }
    }
}
