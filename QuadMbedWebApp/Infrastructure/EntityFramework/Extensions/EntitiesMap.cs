using AutoMapper;
using QuadCtrl.Infrastructure.EntityFramework.Entities;
using QuadCtrl.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.EntityFramework.Extensions
{
    public static class EntitiesMap
    {
        static EntitiesMap()
        {
            //Set up the the entity to model mapping
            Mapper.CreateMap<ActiveQuads, ActiveQuad>();

            Mapper.AssertConfigurationIsValid();
        }

        public static ActiveQuad ToModel(this ActiveQuads activeQuad)
        {
            return activeQuad == null
                       ? null
                       : Mapper.Map<ActiveQuads, ActiveQuad>(activeQuad);
        }
    }
}