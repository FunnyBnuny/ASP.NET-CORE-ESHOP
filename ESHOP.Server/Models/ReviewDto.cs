namespace ESHOP.Server.Models;

public class ReviewDto
{
    public int Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string? ProductName { get; set; }
    public int Rating { get; set; }
    public string? Title { get; set; }
    public string? Comment { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsApproved { get; set; }
}

public class CreateReviewDto
{
    public int ProductId { get; set; }
    public int Rating { get; set; }
    public string? Title { get; set; }
    public string? Comment { get; set; }
}