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

            var quadDbCon = new QuadDbContext("ggg");

            //Setup system config store binding.
            kernel.Bind<IActiveReposIdProvider>().To<BasicActiveReposIdProvider>().InRequestScope();
            kernel.Bind<IRepository<UpdateTracker>>().To<UpdateTrackerRepository>().WithConstructorArgument("db", quadDbCon);
            kernel.Bind<IUpdateTrackerRepos>().To<UpdateTrackerStore>().InRequestScope();
            kernel.Bind<ITrackUpdateMonitor>().To<ActiveQuadMon>().InRequestScope();
            kernel.Bind<QuadDbContext>().To<QuadDbContext>();
         

            kernel.Bind<IRepository<ActiveQuads>>()
                .To<ActiveQuadRepository>()

                .WhenInjectedInto<ActiveQuadRepositoryActive>()
                .WithConstructorArgument("db", quadDbCon);
            kernel.Bind<IRepository<ActiveQuads>>()
                .To<ActiveQuadRepositoryActive>()
                .WhenInjectedInto<ActiveQuadStore>()
                .WithConstructorArgument("db", quadDbCon);
                
            
                


            kernel.Bind<IActiveQuads>()
                .To<ActiveQuadStore>();

           kernel.Bind<IActiveQuadsCtrl>()
                .To<ActiveQuadsStoreCtrl>();
            
           // kernel.Bind<ITest>().To<Testy>();

            kernel.Bind(typeof(IHubConnectionContext<dynamic>)).ToMethod(context =>
                    resolver.Resolve<IConnectionManager>().GetHubContext<ActiveQuadHub>().Clients
                     ).WhenInjectedInto<IActiveQuadsCtrl>();

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