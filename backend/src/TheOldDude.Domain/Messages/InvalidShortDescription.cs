using System;
using System.Runtime.Serialization;

namespace TheOldDude.Domain.Messages
{
    public class InvalidShortDescription : ApplicationException
    {
        public InvalidShortDescription(string message) : base(message)
        {
        }

        public InvalidShortDescription(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected InvalidShortDescription(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
