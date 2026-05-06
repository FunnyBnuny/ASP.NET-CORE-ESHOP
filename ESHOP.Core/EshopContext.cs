using System.Drawing;
using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;
using ESHOP.Core.Models;


namespace ESHOP.Core
{
    public class EshopContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Product_category> Product_categories { get; set; }
        public DbSet<Product_image> Product_images { get; set; }
        public DbSet<Product_variant> Product_variants { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Order_item> Order_items { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Review> Reviews { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            
            modelBuilder.Entity<Product_category>()
                .HasKey(pc => new { pc.product_id, pc.category_id });

            
            modelBuilder.Entity<Product_category>()
                .HasOne(pc => pc.Product)
                .WithMany()
                .HasForeignKey(pc => pc.product_id);

            modelBuilder.Entity<Product_category>()
                .HasOne(pc => pc.Category)
                .WithMany()
                .HasForeignKey(pc => pc.category_id);
        }


        public EshopContext(DbContextOptions<EshopContext> options) : base(options)
        {
          
        }
    }
}
