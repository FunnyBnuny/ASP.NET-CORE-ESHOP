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
       public int Id { get; set; }

        [ForeignKey("User")]

        public int user_id { get; set; }

        public virtual User User { get; set; }

        public string order_number { get; set; }

        public string order_status { get; set; }

        public decimal total_amount { get; set; }

        public decimal shipping_amount { get; set; }

        public decimal tax_amount { get; set; }

        //consult with vojin kratochvil
        [ForeignKey("Address")]
        public int shipping_address_id { get; set; }

        public Address Address { get; set; }
        [ForeignKey("Address")]
        public int billing_address_id { get; set; }
        
        public Address Address2 { get; set; }
        public string payment_method { get; set; }

        public string payment_status { get; set; }

        public string notes { get; set; }


        //DB datatype is timestamp
        public DateTime created_at { get; set; } = DateTime.UtcNow;

        public DateTime updated_at { get; set; } = DateTime.Now;

    }
}
