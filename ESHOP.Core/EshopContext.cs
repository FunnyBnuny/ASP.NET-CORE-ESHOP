using Microsoft.EntityFrameworkCore;
using ESHOP.Core.Models;

namespace ESHOP.Core;

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

    public EshopContext(DbContextOptions<EshopContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

       
        modelBuilder.Entity<Product_category>()
            .HasKey(pc => new { pc.product_id, pc.category_id });

        modelBuilder.Entity<Product_category>()
            .HasOne(pc => pc.Product)
            .WithMany()
            .HasForeignKey(pc => pc.product_id)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Product_category>()
            .HasOne(pc => pc.Category)
            .WithMany()
            .HasForeignKey(pc => pc.category_id)
            .OnDelete(DeleteBehavior.Cascade);

      
        modelBuilder.Entity<Order>()
            .HasOne(o => o.ShippingAddress)
            .WithMany()
            .HasForeignKey(o => o.shipping_address_id)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Order>()
            .HasOne(o => o.BillingAddress)
            .WithMany()
            .HasForeignKey(o => o.billing_address_id)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Order>()
            .HasOne(o => o.User)
            .WithMany()
            .HasForeignKey(o => o.user_id)
            .OnDelete(DeleteBehavior.SetNull);

   
        modelBuilder.Entity<Review>()
            .HasIndex(r => new { r.user_id, r.product_id })
            .IsUnique();

       
        modelBuilder.Entity<Order_item>()
            .HasOne(oi => oi.Product_variant)
            .WithMany()
            .HasForeignKey(oi => oi.product_variant_id)
            .OnDelete(DeleteBehavior.Restrict);
    }
}