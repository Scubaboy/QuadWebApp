using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Ninject;
using Owin;
using QuadCtrl.Infrastructure.Dependecy_Resolver.Ninject;
using QuadCtrl.Infrastructure.SystemStorage;
using QuadCtrl.Infrastructure.SystemStorage.LocalStorage;
using QuadCtrl.Infrastructure.SystemStorage.SystemStore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[assembly: OwinStartup(typeof(QuadCtrl.Startup))]

namespace QuadCtrl
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //set up the IoC
            var kernel = new StandardKernel();
            var resolver = new NinjectSignalRDependencyResolver(kernel);

            //Setup system config store binding.
            kernel.Bind<IStore>()
                .To<MemoryStorage>()
                .InSingletonScope();

            kernel.Bind<ISystemStorage>()
                .To<SysStore>()
                .InSingletonScope();

            var config = new HubConfiguration();

            config.Resolver = resolver;

            ConfigureSignalR(app, config);
        }

        public void ConfigureSignalR(IAppBuilder app, HubConfiguration config)
        {
            app.MapSignalR(config);
        }
    }
}