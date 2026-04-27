using ESHOP.Core.Enums;
using Org.BouncyCastle.Bcpg;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESHOP.Core.Models
{
    [Table("orders")]
    public class Order
    {
        [Key]
        public int id { get; set; }

        [Required]
        public int user_id { get; set; }

        [ForeignKey(nameof(user_id))]
        public User User { get; set; }

        public string session_id { get; set; }

        public string order_number { get; set; }

        public order_status_enum order_status { get; set; }

        public decimal total_amount { get; set; }

        public decimal shipping_amount { get; set; }

        public decimal tax_amount { get; set; }

        public int? shipping_address_id { get; set; }

        [ForeignKey(nameof(shipping_address_id))]
        public Address ShippingAddress { get; set; }

        public int? billing_address_id { get; set; }

        [ForeignKey(nameof(billing_address_id))]
        public Address BillingAddress { get; set; }

        public string payment_method { get; set; }

        public string payment_status { get; set; }

        public string notes { get; set; }

        public DateTime created_at { get; set; } = DateTime.UtcNow;

        public DateTime updated_at { get; set; } = DateTime.UtcNow;
    }
}