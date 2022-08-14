using System.ComponentModel.DataAnnotations;
using Core.Entities;

namespace API.DTOs
{
    public class CustomerBasketDto
    {
        [Required]
         public string Id { get; set; }
        public List<BasketItemDto> Items { get; set; }

    }
}