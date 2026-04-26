using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESHOP.Core.Models
{
    [Table("sizes")]
    public class Size
    {
        [Key]
        public int id {  get; set; }
        public string name { get; set; }

        public int sort_order { get; set; }
    }
}
