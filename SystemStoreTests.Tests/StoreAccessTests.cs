using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Concurrent;
using Moq;
using QuadCtrl.Infrastructure.SystemStorage;
using QuadCtrl.Infrastructure.SystemStorage.SystemStore;

namespace SystemStoreTests.Tests
{
    [TestClass]
    public class StoreAccessTests
    {
        [TestMethod]
        public void ReturnsNullIfItemNotPresent()
        {
            //Arange
            //Data store
            var theStore = new ConcurrentDictionary<Stores, IStorageItemGeneral>();

            var mock = new Mock<IStore>();

            mock.Setup(x => x.GetItem(It.IsAny<Stores>())).Returns((Stores item) =>
            {
                IStorageItemGeneral thevalue;

                var result = theStore.TryGetValue(item, out thevalue);

                return thevalue;
            });


            //Act
            var theStoreAccess = new SysStore(mock.Object);

            var value = theStoreAccess.ActiveQuads;

            //Assert
            Assert.AreEqual(null, value);
        }
    }
}
