// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

namespace Microsoft.Agents.M365Copilot.Core.Helpers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;

    /// <summary>
    /// Helper class for working with URLs.
    /// </summary>
    public static class UrlHelper
    {
        /// <summary>
        /// Parse query options from the URL.
        /// </summary>
        /// <param name="resultUri"></param>
        /// <returns></returns>
        public static IDictionary<string, string> GetQueryOptions(Uri resultUri)
        {
            IEnumerable<string> queryParams = Enumerable.Empty<string>();
            var queryValues = new Dictionary<string, string>();

            if (resultUri.Fragment is { Length: > 1 })
            {
                queryParams = resultUri.Fragment.TrimStart('#').Split('&');
            }
            else if (resultUri.Query is  { Length: > 1 })
            {
                queryParams = resultUri.Query.TrimStart('?').Split('&');
            }

            foreach (var param in queryParams)
            {
                if (string.IsNullOrEmpty(param)) continue;

                int eqIndex = param.IndexOf('=');
                if (eqIndex < 0)
                {
                    queryValues.Add(param, string.Empty);
                }
                else
                {
                    string key = param.Substring(0, eqIndex);
                    string value = param.Substring(eqIndex + 1);
                    queryValues.Add(key, WebUtility.UrlDecode(value));
                }
            }

            return queryValues;
        }
    }
}
