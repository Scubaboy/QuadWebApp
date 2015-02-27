using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuadCtrl.Infrastructure.EntityFramework.Interfaces
{
    public interface IRepository<T>
    {
        IQueryable<T> All { get; }
        void Add(T item);
        void Remove(T item);
        void Clear();
    }
}
