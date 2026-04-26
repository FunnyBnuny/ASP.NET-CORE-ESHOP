using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESHOP.Core.Models
{
    [Table("colors")]
    public class Color
    {
        [Key]
        public int id { get; set; }

        public string name { get; set; }

        public int hex_code { get; set; }
    }
}
