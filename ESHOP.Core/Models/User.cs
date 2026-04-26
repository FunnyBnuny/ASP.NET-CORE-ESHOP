using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESHOP.Core.Models
{
    [Table("users")]
    public class User
    {
        public int id { get; set; }

        public string email { get; set; }

        public string  password_hash { get; set; }

        public string first_name { get; set; }

        public string last_name { get; set; }

        public string phone { get; set; }

        public bool is_admin { get; set; }

        //DB datatype is timestamp
        public DateTime created_at { get; set; } = DateTime.UtcNow;
        public DateTime updated_at { get; set; } = DateTime.Now;

    }
}
