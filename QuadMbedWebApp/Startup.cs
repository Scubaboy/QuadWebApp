using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNet.SignalR.Infrastructure;
using Microsoft.Owin;
using Ninject;
using Ninject.Web.Common;
using Owin;
using QuadCtrl.Infrastructure.Dependecy_Resolver.Ninject;
using QuadCtrl.Infrastructure.EntityFramework.DbContexts;
using QuadCtrl.Infrastructure.EntityFramework.Entities;
using QuadCtrl.Infrastructure.EntityFramework.Interfaces;
using QuadCtrl.Infrastructure.EntityFramework.Repositories.Active;
using QuadCtrl.Infrastructure.EntityFramework.Repositories.Active.IdProviders;
using QuadCtrl.Infrastructure.EntityFramework.Repositories.Passive;
using QuadCtrl.Infrastructure.EntityFramework.Repositories.TrackUpdatesMonitores.ActiveQuadMonitor;
using QuadCtrl.Infrastructure.EntityFramework.StoreControllers.ActiveQuadsStoreController;
using QuadCtrl.Infrastructure.EntityFramework.Stores;
using QuadCtrl.Infrastructure.SignalRHubs;
using QuadCtrl.Infrastructure.SignalRHubs.ActiveQuadHub;

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
            kernel.Bind<QuadDbContext>()
                .To<QuadDbContext>()
                .InSingletonScope()
                .WithConstructorArgument("connectionString", "hh");
            kernel.Bind<IActiveReposIdProvider>()
                .To<BasicActiveReposIdProvider>()
                .InRequestScope();
            kernel.Bind<IRepository<UpdateTracker>>()
                .To<UpdateTrackerRepository>()
                .InRequestScope();
            kernel.Bind<IUpdateTrackerRepos>()
                .To<UpdateTrackerStore>()
                .InRequestScope();
            kernel.Bind<ITrackUpdateMonitor>()
                .To<ActiveQuadMon>()
                .InRequestScope();

            kernel.Bind<IRepository<ActiveQuads>>()
                .To<ActiveQuadRepository>()
                .WhenInjectedInto<ActiveQuadRepositoryActive>()
                .InRequestScope();

            kernel.Bind<IRepository<ActiveQuads>>()
                .To<ActiveQuadRepositoryActive>()
                .WhenInjectedInto<ActiveQuadStore>()
                .InRequestScope();
                
            kernel.Bind<IActiveQuads>()
                .To<ActiveQuadStore>().InRequestScope();

           kernel.Bind<IActiveQuadsCtrl>()
                .To<ActiveQuadsStoreCtrl>().InRequestScope();

           kernel.Bind(typeof(IHubConnectionContext<dynamic>))
               .ToMethod(context =>
                   resolver.Resolve<IConnectionManager>()
                   .GetHubContext<ActiveQuadHub>().Clients)
                    .WhenInjectedInto<IActiveQuadsCtrl>()
                    .InRequestScope();

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