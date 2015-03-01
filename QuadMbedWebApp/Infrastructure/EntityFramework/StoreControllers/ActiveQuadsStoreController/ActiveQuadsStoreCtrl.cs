using QuadCtrl.Infrastructure.EntityFramework.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using QuadCtrl.Infrastructure.EntityFramework.Extensions;
using System.Threading.Tasks;
using QuadCtrl.Infrastructure.Models;
using QuadCtrl.Infrastructure.EntityFramework.StoreControllers.ActiveQuadsStoreController.EventArgs;

namespace QuadCtrl.Infrastructure.EntityFramework.StoreControllers.ActiveQuadsStoreController
{
    public class ActiveQuadsStoreCtrl : IActiveQuadsCtrl
    {
        IActiveQuads repos = null;

        public ActiveQuadsStoreCtrl(IActiveQuads activeQuads)
        {
            this.repos = activeQuads;
        }

        public void Add(Models.ActiveQuad newQuad)
        {
            if (this.repos != null)
            {
                if (newQuad.QuadId != string.Empty && newQuad.QuadId != null)
                {
                    if (!this.repos.Quads.All.Any(x => x.QuadId == newQuad.QuadId))
                    {
                        this.repos.Quads.Add(newQuad.ToEntity());
                        this.repos.Quads.Save();
                    }
                    else
                    {
                        throw new ArgumentException("QuadId already in store", "newQuad");
                    }
                }
                else
                {
                    throw new ArgumentException("QuadId is null or empty", "newQuad");
                }
            }
            else
            {
                throw new InvalidOperationException("Repository object is null");
            }

        }

        public void Update(Models.ActiveQuad quad)
        {
            if (this.repos != null)
            {
                if (quad.QuadId != null && quad.QuadId != string.Empty)
                {
                    var requiredActiveQuad = this.repos.Quads.All.FirstOrDefault(x => x.QuadId == quad.QuadId);

                    if (requiredActiveQuad != null)
                    {
                        requiredActiveQuad.InUse = quad.InUse;
                        requiredActiveQuad.SupportedAlt = quad.SupportedAlt;
                        requiredActiveQuad.SupportedComms = quad.SupportedComms;
                        requiredActiveQuad.SupportedIMU = quad.SupportedIMU;
                        requiredActiveQuad.SupportGPS = quad.SupportGPS;

                        this.repos.Quads.Save();
                    }
                    else
                    {
                        throw new ArgumentException("Quad Id not in store", "quad");
                    }
                }
                else
                {
                    throw new ArgumentException("Quad Id is null or empty", "quad");
                }
            }
            else
            {
                throw new InvalidOperationException("Repository is null.");
            }
        }


        public List<ActiveQuad> AvailableQuads()
        {
            if (this.repos != null)
            {
                return this.repos.Quads.All.Select(x => x.ToModel()).ToList();
            }
            else
            {
                throw new InvalidOperationException("Repository is null.");
            }
        }

        protected virtual void OnActiveQuadChange(ActiveQuadCtrlEventArgs eventArgs)
        {
            EventHandler<ActiveQuadCtrlEventArgs> handler = ActiveQuadChange; 

            if (handler != null)
            {
                handler(this, eventArgs);
            }
        }

        public event EventHandler<EventArgs.ActiveQuadCtrlEventArgs> ActiveQuadChange;
    }
}