using Microsoft.AspNet.SignalR;
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
using QuadCtrl.Infrastructure.EntityFramework.StoreControllers.ActiveQuadsStoreController;
using QuadCtrl.Infrastructure.EntityFramework.Stores;

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
            kernel.Bind<BasicActiveReposIdProvider>().ToSelf().InRequestScope();

            kernel.Bind<IActiveReposIdProvider>().To<BasicActiveReposIdProvider>();
            kernel.Bind<IRepository<ActiveQuads>>()
                .To<ActiveQuadRepositoryActive>()
                .InSingletonScope()
                .WithConstructorArgument("db", quadDbCon);


            kernel.Bind<IActiveQuads>()
                .To<ActiveQuadStore>()
                .InSingletonScope();

            kernel.Bind<IActiveQuadsCtrl>()
                .To<ActiveQuadsStoreCtrl>()
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