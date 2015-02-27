using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Concurrent;
using QuadCtrl.Infrastructure.SystemStorage;
using Moq;
using QuadCtrl.Infrastructure.SystemStorage.SystemStore;
using QuadCtrl.Infrastructure.SystemStorage.ActiveQuadItem;

namespace SystemStoreTests.Tests
{
    [TestClass]
    public class StoreTestsActiveQuadStoreItem
    {
        [TestMethod]
        public void AddsIfIDIsNotEmpty()
        {
            //Arange
            var theStore = new ConcurrentDictionary<Stores, IStorageItemGeneral>();
            var mock = new Mock<IStore>();

            mock.Setup(x => x.SetItem(It.IsAny<Stores>(), It.IsAny<IStorageItemGeneral>())).Callback((Stores item, IStorageItemGeneral theItem) =>
            {
                var result = theStore.TryAdd(item, theItem);
            });


            //Act
            var theStoreAccess = new SysStore(mock.Object);

            var itemToAdd = new ActiveQuadItem();
            itemToAdd.Item.ID = "ttt";
            theStoreAccess.ActiveQuads = itemToAdd; 

            //Assert
            Assert.AreEqual(theStore.Count, 1);
        }
        [TestMethod]
        public void DoesNotAddIfIDIsEmpty()
        {
            //Arange
            var theStore = new ConcurrentDictionary<Stores, IStorageItemGeneral>();
            var mock = new Mock<IStore>();

            mock.Setup(x => x.SetItem(It.IsAny<Stores>(), It.IsAny<IStorageItemGeneral>())).Callback((Stores item, IStorageItemGeneral theItem) =>
            {
                var result = theStore.TryAdd(item, theItem);
            });


            //Act
            var theStoreAccess = new SysStore(mock.Object);

            var itemToAdd = new ActiveQuadItem();
            theStoreAccess.ActiveQuads = itemToAdd;

            //Assert
            Assert.AreEqual(theStore.Count, 0);
        }
    }
}
