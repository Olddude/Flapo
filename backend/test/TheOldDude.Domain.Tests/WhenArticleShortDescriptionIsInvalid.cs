using TheOldDude.Domain.Extensions;
using TheOldDude.Domain.Messages;

using FluentAssertions;
using Xunit;

using System;

namespace TheOldDude.Domain.Tests
{
    public class WhenArticleShortDescriptionIsInvalid
    {
        [Fact]
        public void ThenThrowsErrorOnUnitCount()
        {
            var sut = new Article
            {
                ShortDescription = "20 x asdasdasd"
            };

            Action action = () => sut.UnitCount();

            action.Should().ThrowExactly<InvalidShortDescription>()
                .WithMessage(sut.ShortDescription);
        }

        [Fact]
        public void ThenThrowsErrorOnPricePerUnit()
        {
            var sut = new Article
            {
                ShortDescription = "20 x asdasdasd"
            };

            Action action = () => sut.PricePerUnit();

            action.Should().ThrowExactly<InvalidShortDescription>()
                .WithMessage(sut.ShortDescription);
        }
    }
}
