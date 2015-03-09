using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuadCtrl.Infrastructure.EntityFramework
{
    /// <summary>
    /// Defines the entities that have access to the MbedQuad database.
    /// </summary>
    public enum DbAccessEntities
    {
        /// <summary>
        /// Quad comms module.
        /// </summary>
        QuadComm,

        /// <summary>
        /// Quad web frontend.
        /// </summary>
        QuadCtrlWeb,
    }

    /// <summary>
    /// Defines the types of updates.
    /// </summary>
    public enum DbUpdate
    {
        /// <summary>
        /// Active quad information updated.
        /// </summary>
        ActiveQuad,
        
        /// <summary>
        /// Updated quad status provided.
        /// </summary>
        QuadStatus
    }
}