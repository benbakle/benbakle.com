using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(benbakle.com.Startup))]
namespace benbakle.com
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
