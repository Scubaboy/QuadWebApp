using AutoMapper;
using QuadCtrl.Infrastructure.EntityFramework.Entities;
using QuadCtrl.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.EntityFramework.Extensions
{
    
        public static class ModelsMap
        {
            static ModelsMap()
            {
                //Set up the the entity to model mapping
                Mapper.CreateMap<ActiveQuad, ActiveQuads>()
                    .ForMember(x => x.ID, opts => opts.Ignore());

                Mapper.AssertConfigurationIsValid();
            }

            public static ActiveQuads ToEntity(this ActiveQuad activeQuad)
            {
                return activeQuad == null
                           ? null
                           : Mapper.Map<ActiveQuad, ActiveQuads>(activeQuad);
            }
        }
    }
