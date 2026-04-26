using System.Drawing;
using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;
using ESHOP.Core.Models;


namespace ESHOP.Core
{
    public class EshopContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }

        public DbSet<Product_category> Product_categories { get; set; }

        public DbSet<Cart_item> Cart_items { get; set; }

        public DbSet<Product_image> Product_images { get; set; }

        public DbSet<Product_variant> Product_variants { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Order_item> Order_items { get; set; }

        public DbSet<ESHOP.Core.Models.Size> Sizes { get; set; }

        public DbSet<Review> Reviews { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<ESHOP.Core.Models.Color> Colors { get; set; }
        
        public DbSet<Cart> Cart {  get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Address> Adresses { get; set; }

        
        public EshopContext(DbContextOptions<EshopContext> options) : base(options)
        {
          
        }
    }
}
