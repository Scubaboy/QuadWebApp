using Microsoft.VisualStudio.TestTools.UnitTesting;
using QuadCtrl.Infrastructure.EntityFramework.Entities;
using QuadCtrl.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QuadCtrl.Infrastructure.EntityFramework.Extensions;

namespace EntityModelMappingTests.Tests
{
    [TestClass]
    public class ModelToEntityMappingTests
    {
        private string ObjectToJsonString(object obj)
        {
            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();

            return serializer.Serialize(obj);
        }

        [TestMethod]
        public void MapsAnActiveQuadModelToEntity()
        {
            //arrange
            var modelData = new ActiveQuad
            {
                QuadId = "quad1",
                InUse = false,
                SupportedAlt = AltimeterOptions.CGPSALtic,
                SupportedComms = CommsOptions.Xbee,
                SupportedIMU = IMUOpions.DCM,
                SupportGPS = GPSOptions.MKV11

            };

            var entityData = new ActiveQuads
            {
                QuadId = "quad1",
                InUse = false,
                SupportedAlt = AltimeterOptions.CGPSALtic,
                SupportedComms = CommsOptions.Xbee,
                SupportedIMU = IMUOpions.DCM,
                SupportGPS = GPSOptions.MKV11
            };

            //Act
            var entityFromModel = modelData.ToEntity();

            //Assert
            //Instead of overriding the equals method on the entity object and model object
            //decided to convert both objects to json strings and compare the contents of the
            //strings at the end of the day thats all we are interested in that the conversion
            //from entity to model maintains the data.
            var actual = ObjectToJsonString(entityFromModel);
            var expected = ObjectToJsonString(entityData);

            Assert.AreEqual(expected, actual);
        }
    }
}
