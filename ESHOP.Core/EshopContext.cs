using Microsoft.EntityFrameworkCore;

namespace ESHOP.Core
{
    public class EshopContext : DbContext
    {
        public EshopContext(DbContextOptions<EshopContext> options) : base(options)
        {

        }
    }
}
