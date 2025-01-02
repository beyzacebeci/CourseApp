using CourseApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseApp.Application.Contracts.Persistence
{
    public interface IPaymentRepository : IGenericRepository<Payment,int>
    {
    }
}
