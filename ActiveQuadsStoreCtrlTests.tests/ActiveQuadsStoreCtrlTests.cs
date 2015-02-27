using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using QuadCtrl.Infrastructure.EntityFramework.Interfaces;
using Moq;

namespace ActiveQuadsStoreCtrlTests.tests
{
    [TestClass]
    public class ActiveQuadsStoreCtrlTests
    {
        [TestMethod]
        public void QuadAddedOnlyIfAllRequiredFieldsPressent()
        {
            var mockIActiveQuads = new Mock<IActiveQuads>();

            mockIActiveQuads.SetupGet(x => x.Quads).Returns();
        }
    }
}
