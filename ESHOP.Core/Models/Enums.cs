using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESHOP.Core.Enums
{
    public enum size_enum
    {
        S,
        M,
        L,
        XL,
        XXL
    }

    public enum color_enum
    {
        Black, 
        White, 
        Red, 
        Blue, 
        Green, 
        Yellow, 
        Pink, 
        Purple, 
        Orange, 
        Grey, 
        Brown, 
        Navy
    }

    public enum order_status_enum
    {
        Cart,
        Pending, 
        Processing, 
        Shipped, 
        Delivered, 
        Cancelled, 
        Returned
    }
}