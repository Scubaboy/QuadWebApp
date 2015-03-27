using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using QuadCtrl.Infrastructure.EntityFramework.Interfaces;
using Moq;
using QuadCtrl.Infrastructure.EntityFramework.Entities;
using System.Collections.Generic;
using QuadCtrl.Infrastructure.EntityFramework.StoreControllers.ActiveQuadsStoreController;
using QuadCtrl.Infrastructure.Models;
using System.Linq;

namespace ActiveQuadsStoreCtrlTests.tests
{
    [TestClass]
    public class ActiveQuadsStoreCtrlTests
    {

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void QuadUpdateRaiseArgExpIfIdEmptyString()
        {
            //Arange
            var mockStore = new List<ActiveQuads>();

            var mockIActiveQuads = new Mock<IActiveQuads>();
            var mockIRepository = new Mock<IRepository<ActiveQuads>>();

            mockIRepository.Setup(x => x.All).Returns(mockStore);

            mockIActiveQuads.SetupGet(x => x.Quads).Returns(mockIRepository.Object);

            var activeQuadStore = new ActiveQuadsStoreCtrl(mockIActiveQuads.Object,null);

            var newQuad = new ActiveQuads();

            newQuad.QuadId = string.Empty;

            //Act
            activeQuadStore.Update(newQuad);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void QuadUpdateRaiseArgExpIfIdNull()
        {
            //Arange
            var mockStore = new List<ActiveQuads>();

            var mockIActiveQuads = new Mock<IActiveQuads>();
            var mockIRepository = new Mock<IRepository<ActiveQuads>>();

            mockIRepository.Setup(x => x.All).Returns(mockStore);

            mockIActiveQuads.SetupGet(x => x.Quads).Returns(mockIRepository.Object);

            var activeQuadStore = new ActiveQuadsStoreCtrl(mockIActiveQuads.Object,null);

            var newQuad = new ActiveQuads();

            newQuad.QuadId = null;

            //Act
            activeQuadStore.Update(newQuad);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void QuadUpdateRaiseArgExpIfIdNotInStore()
        {
            //Arange
            var mockStore = new List<ActiveQuads>();

            var mockIActiveQuads = new Mock<IActiveQuads>();
            var mockIRepository = new Mock<IRepository<ActiveQuads>>();

            mockIRepository.Setup(x => x.All).Returns(mockStore);

            mockIActiveQuads.SetupGet(x => x.Quads).Returns(mockIRepository.Object);

            var activeQuadStore = new ActiveQuadsStoreCtrl(mockIActiveQuads.Object,null);

            var newQuad = new ActiveQuads();

            newQuad.QuadId = "quadId";

            //Act
            activeQuadStore.Update(newQuad);
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void QuadListStoreNullExpectInavlidOpExt()
        {
            var activeQuadStore = new ActiveQuadsStoreCtrl(null,null);

            var newQuad = new ActiveQuad();

            newQuad.QuadId = null;

            //Act
            activeQuadStore.AvailableQuads();
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void QuadUpdateStoreNullExpectInavlidOpExt()
        {
            var activeQuadStore = new ActiveQuadsStoreCtrl(null,null);

            var newQuad = new ActiveQuads();

            newQuad.QuadId = null;

            //Act
            activeQuadStore.Update(newQuad);
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void QuadAddStoreNullExpectInavlidOpExt()
        {
            var activeQuadStore = new ActiveQuadsStoreCtrl(null,null);

            var newQuad = new ActiveQuads();

            newQuad.QuadId = null;

            //Act
            activeQuadStore.Add(newQuad);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void AddIfQuadIdNullExpectArgEception()
        {
            //Arange
            var mockStore = new List<ActiveQuads>();

            var mockIActiveQuads = new Mock<IActiveQuads>();
            var mockIRepository = new Mock<IRepository<ActiveQuads>>();

            mockIRepository.Setup(x => x.All).Returns(mockStore);

            mockIActiveQuads.SetupGet(x => x.Quads).Returns(mockIRepository.Object);

            var activeQuadStore = new ActiveQuadsStoreCtrl(mockIActiveQuads.Object,null);

            var newQuad = new ActiveQuads();

            newQuad.QuadId = null;

            //Act
            activeQuadStore.Add(newQuad);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void AddIfQuadIdemptyExpectArgEception()
        {
            //Arange
            var mockStore = new List<ActiveQuads>();

            var mockIActiveQuads = new Mock<IActiveQuads>();
            var mockIRepository = new Mock<IRepository<ActiveQuads>>();

            mockIRepository.Setup(x => x.All).Returns(mockStore);

            mockIActiveQuads.SetupGet(x => x.Quads).Returns(mockIRepository.Object);

            var activeQuadStore = new ActiveQuadsStoreCtrl(mockIActiveQuads.Object,null);

            var newQuad = new ActiveQuads();

            newQuad.QuadId = string.Empty;

            //Act
            activeQuadStore.Add(newQuad);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void AddIfQuadIdInStoreExpectArgEception()
        {
            //Arange
            var mockStore = new List<ActiveQuads>()
            {
                new ActiveQuads
                {
                    QuadId = "quad1"
                }
            };

            var mockIActiveQuads = new Mock<IActiveQuads>();
            var mockIRepository = new Mock<IRepository<ActiveQuads>>();

            mockIRepository.Setup(x => x.All).Returns(mockStore);

            mockIActiveQuads.SetupGet(x => x.Quads).Returns(mockIRepository.Object);

            var activeQuadStore = new ActiveQuadsStoreCtrl(mockIActiveQuads.Object,null);

            var newQuad = new ActiveQuads();

            newQuad.QuadId = "quad1";

            //Act
            activeQuadStore.Add(newQuad);
        }

        [TestMethod]
        public void QuadAddedOnlyIfQuadIdNotAlreadyInStore()
        {
            //Arange
            var mockStore = new List<ActiveQuads>();

            var mockIActiveQuads = new Mock<IActiveQuads>();
            var mockIRepository = new Mock<IRepository<ActiveQuads>>();

            mockIRepository.Setup(x => x.Add(It.IsAny<ActiveQuads>())).Callback((ActiveQuads quad) =>
            {
                mockStore.Add(quad);
            });

            mockIRepository.SetupGet(x => x.All).Returns(mockStore);
            mockIActiveQuads.SetupGet(x => x.Quads).Returns(mockIRepository.Object);

            var activeQuadStore = new ActiveQuadsStoreCtrl(mockIActiveQuads.Object,null);

            var newQuad = new ActiveQuads();

            newQuad.QuadId = "quad1";

            //Act
            activeQuadStore.Add(newQuad);

        }

        [TestMethod]
        public void QuadAddedOnlyIfQuadIdIsNotNullAndNotEmptyString()
        {
            //Arange
            var mockStore = new List<ActiveQuads>();
            var mockIActiveQuads = new Mock<IActiveQuads>();
            var mockIRepository = new Mock<IRepository<ActiveQuads>>();

            mockIRepository.Setup(x => x.Add(It.IsAny<ActiveQuads>())).Callback((ActiveQuads quad) =>
            {
                mockStore.Add(quad);
            });

            mockIActiveQuads.SetupGet(x => x.Quads).Returns(mockIRepository.Object);

            var activeQuadStore = new ActiveQuadsStoreCtrl(mockIActiveQuads.Object,null);

            var newQuad = new ActiveQuads();

            newQuad.QuadId = "quad1";

            //Act
            activeQuadStore.Add(newQuad);

        }
    }
}
