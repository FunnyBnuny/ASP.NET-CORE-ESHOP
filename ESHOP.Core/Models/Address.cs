using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESHOP.Core.Models
{
    [Table("addresses")]
    public class Address
    {
        [Key]
        public int id { get; set; }

        [ForeignKey("User")]
        public int user_id {  get; set; }

        public  User User { get; set; }

        public string address_line1 { get; set; }

        public string address_line2 { get; set; }

        public string city { get; set; }

        public string state { get; set; }

        public string postal_code { get; set; }

        public string country { get; set; }

        public bool is_default_shipping { get; set; }

        public bool is_default_billing { get; set; }

        //DB datatype is timestamp
        public DateTime created_at { get; set; } = DateTime.UtcNow;

    }
}
