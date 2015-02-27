using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using QuadCtrl.Infrastructure.EntityFramework.Entities;
using QuadCtrl.Infrastructure.Models;
using QuadCtrl.Infrastructure.EntityFramework.Extensions;

namespace EntityModelMappingTests.Tests
{
    [TestClass]
    public class EntityToModelMappingTests
    {
        private string ObjectToJsonString(object obj)
        {
            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();

            return serializer.Serialize(obj);
        }

        [TestMethod]
        public void MapsAnActiveQuadsEntityToModel()
        {
            //arrange
            var entityData = new ActiveQuads
            {
                QuadId = "quad1",
                InUse = false,
                SupportedAlt = AltimeterOptions.CGPSALtic,
                SupportedComms = CommsOptions.Xbee,
                SupportedIMU = IMUOpions.DCM,
                SupportGPS = GPSOptions.MKV11

            };

            var modelData = new ActiveQuad
            {
                QuadId = "quad1",
                InUse = false,
                SupportedAlt = AltimeterOptions.CGPSALtic,
                SupportedComms = CommsOptions.Xbee,
                SupportedIMU = IMUOpions.DCM,
                SupportGPS = GPSOptions.MKV11
            };

            //Act
            var modelFromEntity = entityData.ToModel();

            //Assert
            //Instead of overriding the equals method on the entity object and model object
            //decided to convert both objects to json strings and compare the contents of the
            //strings at the end of the day thats all we are interested in that the conversion
            //from entity to model maintains the data.
            var actual = ObjectToJsonString(modelFromEntity);
            var expected = ObjectToJsonString(modelData);

            Assert.AreEqual(expected, actual);
        }
    }
}
